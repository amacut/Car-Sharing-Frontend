export interface VehicleResponseInterface {
  id: number;
  vehicleModelId: number;
  registration: string;
  maxFuel: number;
  currentFuel: number;
  maxRange: number;
  currentRange: number;
  latitude: number;
  longitude: number;
}
