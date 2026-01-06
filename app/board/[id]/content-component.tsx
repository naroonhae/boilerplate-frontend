'use client';

import { Content } from '@/services/content.service';

interface Props {
  content: Content;
}

export default function ContentComponent({ content }: Props) {
  return <>{content.title}</>;
}
