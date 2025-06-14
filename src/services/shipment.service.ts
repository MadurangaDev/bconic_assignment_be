import { StatusCodes, TrackingStatus } from "@/types/enums";
import { IShipmentFromDB, IShipmentHistoryFromDB } from "@/types/interfaces";
import { ICreateShipmentDTO, IUpdateShipmentDTO } from "@requests";
import { calculateShippingCost } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createShipment = async (
  shipmentData: ICreateShipmentDTO,
  userId: number
): Promise<IShipmentFromDB> => {
  try {
    const shipment = await prisma.shipment.create({
      data: {
        dimensions: shipmentData.dimensions,
        packageDescription: shipmentData.packageDescription,
        recipientAddress: shipmentData.recipientAddress,
        recipientCity: shipmentData.recipientCity,
        recipientName: shipmentData.recipientName,
        recipientPhone: shipmentData.recipientPhone,
        recipientPostalCode: shipmentData.recipientPostalCode,
        senderAddress: shipmentData.senderAddress,
        senderCity: shipmentData.senderCity,
        senderName: shipmentData.senderName,
        senderPhone: shipmentData.senderPhone,
        senderPostalCode: shipmentData.senderPostalCode,
        weight: shipmentData.weight,
        recipientEmail: shipmentData.recipientEmail,
        specialInstructions: shipmentData.specialInstructions,
        deliveryCharge: calculateShippingCost({
          weightKg: shipmentData.weight,
          lengthCm: parseFloat(shipmentData.dimensions.split("x")[0]),
          widthCm: parseFloat(shipmentData.dimensions.split("x")[1]),
          heightCm: parseFloat(shipmentData.dimensions.split("x")[2]),
        }),
        currentStatus: TrackingStatus.PENDING_PICKUP,
        paymentStatus: false,
        user: {
          connect: { id: userId },
        },
        TrackingRecords: {
          create: {
            status: TrackingStatus.PENDING_PICKUP,
          },
        },
      },
    });
    return {
      ...shipment,
      currentStatus: shipment.currentStatus as TrackingStatus,
      recipientEmail: shipment.recipientEmail || undefined,
      specialInstructions: shipment.specialInstructions || undefined,
    };
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to create shipment",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const updateShipment = async (
  shipmentData: IUpdateShipmentDTO & {
    deliveryCharge?: number;
  }
): Promise<IShipmentFromDB> => {
  try {
    const shipment = await prisma.shipment.update({
      where: { id: shipmentData.id },
      data: {
        dimensions: shipmentData.dimensions,
        packageDescription: shipmentData.packageDescription,
        recipientAddress: shipmentData.recipientAddress,
        recipientCity: shipmentData.recipientCity,
        recipientName: shipmentData.recipientName,
        recipientPhone: shipmentData.recipientPhone,
        recipientPostalCode: shipmentData.recipientPostalCode,
        senderAddress: shipmentData.senderAddress,
        senderCity: shipmentData.senderCity,
        senderName: shipmentData.senderName,
        senderPhone: shipmentData.senderPhone,
        senderPostalCode: shipmentData.senderPostalCode,
        weight: shipmentData.weight,
        recipientEmail: shipmentData.recipientEmail,
        specialInstructions: shipmentData.specialInstructions,
        deliveryCharge: shipmentData.deliveryCharge,
        currentStatus: shipmentData.currentStatus as TrackingStatus | undefined,
        paymentStatus:
          typeof shipmentData.paymentStatus === "boolean"
            ? shipmentData.paymentStatus
            : undefined,
      },
    });
    return {
      ...shipment,
      currentStatus: shipment.currentStatus as TrackingStatus,
      recipientEmail: shipment.recipientEmail || undefined,
      specialInstructions: shipment.specialInstructions || undefined,
    };
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to update shipment",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const getShipmentById = async (
  id: number
): Promise<IShipmentFromDB | null> => {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id },
    });
    if (!shipment) {
      return null;
    }
    return {
      ...shipment,
      currentStatus: shipment.currentStatus as TrackingStatus,
      recipientEmail: shipment.recipientEmail || undefined,
      specialInstructions: shipment.specialInstructions || undefined,
    };
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to retrieve shipment",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const getAllShipments = async (
  userId?: number
): Promise<IShipmentFromDB[]> => {
  try {
    const shipments = await prisma.shipment.findMany({
      where: userId ? { user: { id: userId } } : {},
      orderBy: { createdAt: "desc" },
    });
    return shipments.map((shipment) => ({
      ...shipment,
      currentStatus: shipment.currentStatus as TrackingStatus,
      recipientEmail: shipment.recipientEmail || undefined,
      specialInstructions: shipment.specialInstructions || undefined,
    }));
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to retrieve shipments",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const getShipmentHistory = async (
  shipmentId: number
): Promise<IShipmentHistoryFromDB[]> => {
  try {
    const history = await prisma.trackingHistory.findMany({
      where: { shipmentId },
      orderBy: { createdAt: "desc" },
    });
    return history.map((record) => ({
      ...record,
      status: record.status as TrackingStatus,
    }));
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to retrieve shipment history",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};

export const addTrackingRecord = async (
  shipmentId: number,
  status: TrackingStatus
): Promise<IShipmentHistoryFromDB> => {
  try {
    const record = await prisma.trackingHistory.create({
      data: {
        shipmentId,
        status,
      },
    });
    return {
      ...record,
      status: record.status as TrackingStatus,
    };
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to add tracking record",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};
