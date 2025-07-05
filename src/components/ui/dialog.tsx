import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;

export function DialogContent(props) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/40" />
      <RadixDialog.Content
        {...props}
        className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg focus:outline-none"
      >
        {props.children}
        <RadixDialog.Close className="absolute right-4 top-4">
          <X className="h-5 w-5" />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle = RadixDialog.Title;
