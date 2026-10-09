import { SITE } from "@/data/site";

export function createEmailDraft(fields: { name: string; email: string; message: string }) {
  const name = fields.name.trim().replace(/[\r\n]+/g, " ");
  const subject = `Portfolio enquiry from ${name || "a visitor"}`;
  const body = `Name: ${name}\nReply email: ${fields.email.trim()}\n\n${fields.message}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
