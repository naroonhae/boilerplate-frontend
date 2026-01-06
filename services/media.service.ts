import axios from '@/lib/axios';
import { ApiResponse } from '@/types/response';

type MediaType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'OTHER' | 'ARCHIVE';
type MediaStatus = 'UPLOADING' | 'COMPLETED' | 'FAILED';

export interface MediaQuota {
  memberId: number;
  maxStorageSize: number; // 최대 저장 용량 (bytes)
  usedStorageSize: number; // 사용 중인 용량 (bytes)
  maxFileSize: number; // 개별 파일 최대 크기 (bytes)
  allowedFileTypes: string[]; // 허용된 파일 확장자
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: number;
  publicUrl: string;
  mediaType: MediaType;

  // 파일 정보
  originalFileName: string; // 원본 파일명
  storedFileName: string; // 저장된 파일명 (UUID 등)
  fileExtension: string; // 확장자 (jpg, png, pdf)
  mimeType: string; // MIME 타입 (image/jpeg)
  fileSize: number; // 파일 크기 (bytes)

  // 이미지 전용 (nullable)
  width: number; // 이미지 너비 (px)
  height: number; // 이미지 높이 (px)
  thumbnailUrl: string; // 썸네일 URL

  // 비디오 전용 (nullable)
  duration: number; // 재생 시간 (초)
  resolution: number; // 해상도 (1920x1080)

  // 상태 및 메타
  status: MediaStatus; // UPLOADING, COMPLETED, FAILED
  isPublic: boolean; // 공개 여부
  tags: string[]; // 태그

  // 연관 정보 (어디에 사용되는지)
  relatedType: string; // CONTENT, PROFILE, COMMENT
  relatedId: number; // 관련 엔티티 ID

  // 다운로드 정보
  downloadCount: number;

  createdAt: string;
  updatedAt: string;
}

interface UploadMediaRequest {
  file: File;
  isPublic: boolean;
  relatedType: string;
  relatedId: number;
}

export const mediaService = {
  uploadMedia: async (request: UploadMediaRequest): Promise<Media> => {
    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('isPublic', request.isPublic.toString());
    formData.append('relatedType', request.relatedType);
    formData.append('relatedId', request.relatedId.toString());

    const response = await axios.post<ApiResponse<Media>>(
      '/server/media-service/api/v1/media',
      formData,
    );
    return response.data.data;
  },

  getMedia: async (id: number): Promise<Media> => {
    const response = await axios.get<ApiResponse<Media>>(
      `/server/media-service/api/v1/media/${id}`,
    );
    return response.data.data;
  },

  getOwnMedia: async (page: number, size: number): Promise<Media[]> => {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    const response = await axios.get<ApiResponse<Media[]>>(
      `/server/media-service/api/v1/media/me?${searchParams.toString()}`,
    );
    return response.data.data;
  },

  getMediaQuota: async (): Promise<MediaQuota> => {
    const response = await axios.get<ApiResponse<MediaQuota>>(
      '/server/media-service/api/v1/media/quota',
    );
    return response.data.data;
  },

  deleteMedia: async (id: number): Promise<string> => {
    const response = await axios.delete(`/server/media-service/api/v1/media/${id}`);
    return response.data.result;
  },

  // URL 반환 방식 (presigned URL 등)
  downloadMedia: async (id: number): Promise<string> => {
    const response = await axios.get<ApiResponse<string>>(
      `/media-service/api/v1/media/${id}/download`,
    );
    return response.data.data; // 다운로드 URL 반환
  },

  // 직접 다운로드 방식 (파일 바이너리 전송)
  downloadMediaDirect: async (id: number, fileName?: string): Promise<void> => {
    const response = await axios.get(`/server/media-service/api/v1/media/${id}/download`, {
      responseType: 'blob',
    });

    // 파일명 추출 (Content-Disposition 헤더에서)
    const contentDisposition = response.headers['content-disposition'];
    const fileNameMatch = contentDisposition?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    const defaultFileName = fileNameMatch
      ? fileNameMatch[1].replace(/['"]/g, '')
      : fileName || `media-${id}`;

    // Blob으로 다운로드
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = defaultFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};
