import { ICreateShipmentDTO } from "@requests";
import { TrackingStatus } from "@enums";

export interface IShipment extends ICreateShipmentDTO {
  deliveryCharge: number;
  paymentStatus: boolean;
}
export interface IShipmentFromDB extends IShipment {
  id: number;
  clientId: number;
  createdAt: Date;
  updatedAt: Date;
  currentStatus: TrackingStatus;
}

export interface IShipmentHistory {
  shipmentId: number;
  status: TrackingStatus;
}

export interface IShipmentHistoryFromDB extends IShipmentHistory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
