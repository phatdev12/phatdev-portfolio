'use client';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';

export function Markdown({ content }: { content: MDXRemoteProps }) {
  return <MDXRemote {...content} />;
}