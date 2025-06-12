import { Request, Response } from "express";

import { StatusCodes } from "@enums";
import { calculateShippingCost, createResponse } from "@utils";
import { ICreateShipmentDTO, IUpdateShipmentDTO } from "@requests";
import {
  createShipment,
  getShipmentById,
  updateShipment,
  getAllShipments,
} from "@services";
import { ICalculateShippingCostDTO } from "@/types/interfaces/requests/shipment/calculate.request";

export const handleCreateShipment = async (req: Request, res: Response) => {
  try {
    const newShipment = await createShipment(req.body as ICreateShipmentDTO);
    return createResponse(
      res,
      newShipment,
      "Shipment created successfully",
      StatusCodes.CREATED
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Internal server error",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleUpdateShipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqBody = req.body as IUpdateShipmentDTO;

    const oldShipment = await getShipmentById(Number(id));
    if (!oldShipment) {
      throw {
        message: "Shipment not found",
        code: StatusCodes.NOT_FOUND,
      };
    }

    const updatableFields = Object.keys(reqBody);
    const hasUpdate = updatableFields.length > 0;

    if (!hasUpdate) {
      throw { message: "No fields to update", code: StatusCodes.BAD_REQUEST };
    }

    let price: number | undefined;

    if (!!(reqBody.weight ?? reqBody.dimensions)) {
      price = calculateShippingCost({
        weightKg: reqBody.weight ?? oldShipment.weight,
        lengthCm: parseFloat(
          (reqBody.dimensions ?? oldShipment.dimensions).split("x")[0]
        ),
        widthCm: parseFloat(
          (reqBody.dimensions ?? oldShipment.dimensions).split("x")[1]
        ),
        heightCm: parseFloat(
          (reqBody.dimensions ?? oldShipment.dimensions).split("x")[2]
        ),
      });
    }

    const updatedShipment = await updateShipment({
      ...{
        ...reqBody,
        deliveryCharge: price,
      },
      id: Number(id),
    });
    return createResponse(
      res,
      updatedShipment,
      "Shipment updated successfully",
      StatusCodes.OK
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Internal server error",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleGetShipmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const shipment = await getShipmentById(Number(id));
    if (!shipment) {
      throw {
        message: "Shipment not found",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return createResponse(
      res,
      shipment,
      "Shipment retrieved successfully",
      StatusCodes.OK
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Internal server error",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleGetAllShipments = async (req: Request, res: Response) => {
  try {
    const shipments = await getAllShipments();
    return createResponse(
      res,
      shipments,
      "Shipments retrieved successfully",
      StatusCodes.OK
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Internal server error",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};
export const handleGetDeliveryFee = async (req: Request, res: Response) => {
  try {
    const { weight, dimensions } = req.body as ICalculateShippingCostDTO;
    const [lengthCm, widthCm, heightCm] = dimensions
      .split("x")
      .map((dim) => parseFloat(dim));
    const deliveryFee = calculateShippingCost({
      weightKg: weight,
      lengthCm,
      widthCm,
      heightCm,
    });
    return createResponse(
      res,
      { deliveryFee },
      "Delivery fee calculated successfully",
      StatusCodes.OK
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Internal server error",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};
