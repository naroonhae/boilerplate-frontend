import axios from '@/lib/axios';
import { ApiResponse } from '@/types/response';

interface CreateDeviceTokenRequest {
  token: string;
  platform: string;
}

export interface DeviceToken {
  id: number;
  memberId: number;
  token: string;
  platform: string;
  lastUpdatedAt: string;
}

export const notificationService = {
  setDeviceTokens: async (request: CreateDeviceTokenRequest): Promise<DeviceToken> => {
    const response = await axios.post<ApiResponse<DeviceToken>>(
      '/server/notification-service/api/v1/device-tokens',
      request,
    );
    return response.data.data;
  },
};
