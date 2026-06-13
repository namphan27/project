import { Request, Response } from "express";
import "dotenv/config";
import { PayOS } from "@payos/node";
import { prisma } from "../utils/prisma";
const payos = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID!,
  apiKey: process.env.PAYOS_API_KEY!,
  checksumKey: process.env.PAYOS_CHECKSUM_KEY!,
});
export const createPaymentLink = async (req: Request, res: Response) => {
  try {
    const { orderId, amount, description } = req.body;
    if (!orderId || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu orderId hoặc amount" });
    }
    const paymentData = {
      orderCode: Number(orderId),
      amount: Number(amount),
      description: description || "Thanh toan don hang",
      cancelUrl: "http://localhost:3001/cancel",
      returnUrl: "http://localhost:3001/success",
    };
    const paymentLink = await payos.paymentRequests.create(paymentData);
    return res
      .status(200)
      .json({ success: true, data: paymentLink.checkoutUrl });
  } catch (error: unknown) {
    console.error("PayOS Error:", error);
    const message =
      error instanceof Error ? error.message : "Không thể tạo link thanh toán";
    return res.status(500).json({ success: false, message });
  }
};

export const handleWebhook = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const webhookData = await payos.webhooks.verify(req.body);

    console.log("Webhook:", webhookData);

    const { orderCode, amount, reference } = webhookData;

    console.log(`Đơn hàng ${orderCode} đã thanh toán`);
    console.log(`Số tiền: ${amount}`);
    console.log(`Mã giao dịch: ${reference}`);

    const order = await prisma.order.findUnique({
      where: { orderCode: Number(orderCode) },
    });

    if (order && order.status !== "PAID") {
      await prisma.order.update({
        where: { orderCode: Number(orderCode) },
        data: {
          status: "PAID",
          paidAt: new Date(),
          transactionId: reference,
        },
      });
      console.log(`Đơn hàng ${orderCode} đã cập nhật trạng thái PAID.`);
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed",
    });
  } catch (error: unknown) {
    console.error("Webhook Error:", error);

    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Webhook invalid",
    });
  }
};
