import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { cn } from "./ui/utils";
import { submitToWeb3Forms } from "../lib/web3formsSubmit";
import { SITE_INQUIRY_EMAIL } from "../seo/site";

function buildMessageBody(
  name: string,
  email: string,
  phone: string,
  organisation: string,
  description: string,
): string {
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Organisation: ${organisation}`,
    "",
    "Brief description:",
    description,
  ].join("\n");
}

async function submitNetlifyForm(
  name: string,
  email: string,
  phone: string,
  organisation: string,
  description: string,
): Promise<{ ok: boolean; message?: string }> {
  const params = new URLSearchParams();
  params.set("form-name", "rsz-inquiry");
  params.set("name", name);
  params.set("email", email);
  params.set("phone", phone);
  params.set("organisation", organisation);
  params.set("description", description);
  params.set("bot-field", "");

  // POST to the published HTML file so Netlify Forms is not shadowed by the SPA /* → index.html rewrite on "/".
  const res = await fetch("/index.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    return {
      ok: false,
      message: `Could not send (${res.status}). Add VITE_WEB3FORMS_ACCESS_KEY at build time and redeploy, or check Netlify Forms for “rsz-inquiry”.`,
    };
  }
  return { ok: true };
}

function netlifyFormsSupportedClient(): boolean {
  if (import.meta.env.VITE_NETLIFY_FORMS === "true") return true;
  if (typeof window !== "undefined" && /\.netlify\.app$/i.test(window.location.hostname)) {
    return true;
  }
  return false;
}

export function InquiryChat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "").trim();
  const isDev = import.meta.env.DEV;

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setOrganisation("");
    setDescription("");
    setStatus("idle");
    setErrorMessage("");
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("sending");

    const message = buildMessageBody(name, email, phone, organisation, description);

    if (accessKey) {
      const w3 = await submitToWeb3Forms({
        accessKey,
        subject: `RSZ website inquiry from ${name}`,
        fromName: name,
        visitorEmail: email,
        message,
      });
      if (!w3.ok) {
        setStatus("error");
        setErrorMessage(w3.message);
        return;
      }
      setStatus("sent");
      return;
    }

    if (isDev) {
      setStatus("error");
      setErrorMessage(
        `Local dev cannot use Netlify Forms. Add VITE_WEB3FORMS_ACCESS_KEY to .env (see web3forms.com), or test after deploy. You can still email ${SITE_INQUIRY_EMAIL}.`,
      );
      return;
    }

    if (!netlifyFormsSupportedClient()) {
      setStatus("error");
      setErrorMessage(
        `This host does not support Netlify Forms (e.g. Render serves static files only). Add VITE_WEB3FORMS_ACCESS_KEY in your service’s **build** environment variables, save, and **redeploy** so Web3Forms runs in the browser. You can still email ${SITE_INQUIRY_EMAIL}.`,
      );
      return;
    }

    const netlify = await submitNetlifyForm(name, email, phone, organisation, description);
    if (!netlify.ok) {
      setStatus("error");
      setErrorMessage(netlify.message ?? "Could not send your message.");
      return;
    }
    setStatus("sent");
  };

  return (
    <>
      <div
        className="fixed z-40 flex flex-col items-end gap-1"
        style={{
          bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
          right: "max(1.25rem, env(safe-area-inset-right, 0px))",
        }}
      >
        <span className="max-w-[10rem] text-right text-xs font-semibold leading-tight tracking-wide text-green-800 drop-shadow-sm [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">
          Talk to Us
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-lg ring-2 ring-white/90 transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          aria-label="Open chat to message RSZ"
        >
          <MessageSquare className="h-7 w-7" strokeWidth={2} aria-hidden />
        </button>
      </div>

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="bottom"
          style={{
            left: "auto",
            right: "max(1.25rem, env(safe-area-inset-right, 0px))",
            top: "auto",
            bottom:
              "calc(max(1.25rem, env(safe-area-inset-bottom, 0px)) + 5.25rem + 0.75rem)",
            width: "min(22rem, calc(100vw - 1.5rem))",
          }}
          className={cn(
            "max-h-[min(24rem,calc(100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)-6.75rem))] flex-col gap-1 overflow-hidden rounded-2xl border-2 border-green-100 bg-background p-0 shadow-2xl",
            "data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4",
          )}
        >
          <SheetHeader className="text-left shrink-0 gap-0 space-y-0.5 p-2 pb-1 pr-10 pt-2">
            <SheetTitle className="text-base leading-tight text-green-800">Message RSZ</SheetTitle>
            <SheetDescription className="text-xs leading-snug">
              Short note: we reply by email.
            </SheetDescription>
          </SheetHeader>

          {status === "sent" ? (
            <div className="flex shrink-0 flex-col items-center gap-2 px-3 pb-3 pt-1 text-center text-gray-700">
              <p className="text-base font-medium text-green-800">Thank you.</p>
              <p className="text-xs leading-snug">We will get back to you soon.</p>
              <Button
                type="button"
                size="sm"
                className="mt-1 bg-green-600 hover:bg-green-700"
                onClick={() => handleOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 flex-col gap-1.5 px-2 pb-2 pt-0"
            >
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <div className="min-w-0 space-y-0.5">
                  <Label htmlFor="inq-name" className="text-xs">
                    Full name
                  </Label>
                  <Input
                    id="inq-name"
                    name="name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-8 text-xs"
                  />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <Label htmlFor="inq-email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="inq-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-8 text-xs"
                  />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <Label htmlFor="inq-phone" className="text-xs">
                    Phone
                  </Label>
                  <Input
                    id="inq-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+263 …"
                    className="h-8 text-xs"
                  />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <Label htmlFor="inq-org" className="text-xs">
                    Organisation
                  </Label>
                  <Input
                    id="inq-org"
                    name="organisation"
                    required
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    placeholder="Affiliation"
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <Label htmlFor="inq-desc" className="text-xs">
                  Brief description
                </Label>
                <Textarea
                  id="inq-desc"
                  name="description"
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="How can we help?"
                  className="min-h-0 resize-none text-xs leading-snug field-sizing-fixed h-[3.25rem] py-1.5"
                />
              </div>

              {status === "error" ? (
                <p className="line-clamp-3 text-xs leading-snug text-red-600" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <SheetFooter className="mt-0 shrink-0 flex-col gap-0 p-0 sm:flex-col">
                <Button
                  type="submit"
                  size="sm"
                  disabled={status === "sending"}
                  className="h-8 w-full bg-green-600 text-xs hover:bg-green-700"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>
              </SheetFooter>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
