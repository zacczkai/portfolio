export interface VideoPreviewWindow {
  start: number;
  duration: number;
}

export const CLOUDINARY_PREVIEW_WIDTHS = [1440, 1920, 2560, 3840] as const;

export function getResponsivePosterWidth(viewportWidth: number, maximumWidth = 2560) {
  const responsiveWidth = CLOUDINARY_PREVIEW_WIDTHS.find((width) => width >= viewportWidth)
    ?? CLOUDINARY_PREVIEW_WIDTHS.at(-1)!;
  return Math.min(responsiveWidth, maximumWidth);
}

function splitCloudinaryVideoUrl(sourceUrl: string) {
  const marker = "/video/upload/";
  const markerIndex = sourceUrl.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error("A URL precisa apontar para um vídeo do Cloudinary.");
  }

  const uploadBase = sourceUrl.slice(0, markerIndex + marker.length);
  const segments = sourceUrl.slice(markerIndex + marker.length).split("/");
  const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
  if (versionIndex === -1) {
    throw new Error("A versão do asset do Cloudinary não foi encontrada.");
  }

  return { uploadBase, assetPath: segments.slice(versionIndex).join("/") };
}

function formatTime(value: number) {
  return Number.isInteger(value)
    ? String(value)
    : value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function validateWidth(width: number) {
  if (!Number.isInteger(width) || width <= 0) {
    throw new Error("A largura precisa ser um inteiro positivo.");
  }
}

function validatePreview({ start, duration }: VideoPreviewWindow) {
  if (start < 0 || duration <= 0) {
    throw new Error("O recorte precisa ter início não negativo e duração positiva.");
  }
}

function transform(sourceUrl: string, transformations: string[]) {
  const { uploadBase, assetPath } = splitCloudinaryVideoUrl(sourceUrl);
  return `${uploadBase}${transformations.join(",")}/${assetPath}`;
}

export function getCloudinaryPreviewUrl(
  sourceUrl: string,
  preview: VideoPreviewWindow,
  width = 1440,
) {
  validatePreview(preview);
  validateWidth(width);
  return transform(sourceUrl, [
    `so_${formatTime(preview.start)}`,
    `du_${formatTime(preview.duration)}`,
    "ac_none",
    "c_limit",
    `w_${width}`,
    "q_auto:eco",
    "vc_h264",
    "f_mp4",
  ]);
}

export function getCloudinaryPosterUrl(
  sourceUrl: string,
  start: number,
  width = 1440,
) {
  validatePreview({ start, duration: 1 });
  validateWidth(width);
  return transform(sourceUrl, [
    `so_${formatTime(start)}`,
    "c_limit",
    `w_${width}`,
    "q_auto:good",
    "f_jpg",
  ]);
}

export function getCloudinaryPlaybackUrl(sourceUrl: string) {
  splitCloudinaryVideoUrl(sourceUrl);
  return sourceUrl;
}

export function getCloudinaryOriginalUrl(sourceUrl: string) {
  const { uploadBase, assetPath } = splitCloudinaryVideoUrl(sourceUrl);
  return `${uploadBase}${assetPath}`;
}

export function getCloudinaryPreviewSources(
  sourceUrl: string,
  preview: VideoPreviewWindow,
) {
  return CLOUDINARY_PREVIEW_WIDTHS.map((width) => ({
    width,
    url: getCloudinaryPreviewUrl(sourceUrl, preview, width),
  }));
}
