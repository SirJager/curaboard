import axiosClient, { AxiosError, AxiosHeaders, AxiosStatic } from "axios";

type FileUpload<T> = Promise<
  { data: T; error?: null; status: number } | { status: number; data?: null; error: Error }
>;

type params = {
  headers?: AxiosHeaders;
  axios?: AxiosStatic;
  progress?: (percent: number) => void;
};

export async function uploadFile<T>(
  url: string,
  form: FormData,
  { progress, ...opts }: params
): FileUpload<T> {
  try {
    const res = await (opts.axios ?? axiosClient).post(url, form, {
      headers: opts.headers,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.progress && progress) {
          const percent = progressEvent.progress * 100;
          progress(percent);
        }
      },
    });
    return { data: res.data, status: res.status };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error, status: error.response?.status || 500 };
    }
    if (error instanceof Error) {
      return { error, status: 500 };
    }
    return { error: new Error("Could not upload image."), status: 500 };
  }
}
