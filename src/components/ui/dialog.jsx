import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Loader2 } from "lucide-react";
import { cva } from "class-variance-authority";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

// Enhanced overlay with blur variants
const overlayVariants = cva(
  "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all duration-300",
  {
    variants: {
      blur: {
        none: "bg-black/80",
        light: "bg-black/60 backdrop-blur-sm",
        medium: "bg-black/70 backdrop-blur-md",
        heavy: "bg-black/80 backdrop-blur-lg",
      },
    },
    defaultVariants: {
      blur: "medium",
    },
  }
);

const DialogOverlay = React.forwardRef(({ className, blur, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={overlayVariants({ blur, className })}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Enhanced content with size and variant options
const contentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] focus:outline-none",
  {
    variants: {
      size: {
        sm: "w-full max-w-sm p-4 rounded-lg",
        md: "w-full max-w-lg p-6 rounded-lg",
        lg: "w-full max-w-2xl p-6 rounded-lg",
        xl: "w-full max-w-4xl p-8 rounded-lg",
        full: "w-[95vw] h-[95vh] max-w-none p-6 rounded-lg",
        mobile: "w-[95vw] max-w-sm p-4 rounded-lg sm:max-w-lg sm:p-6",
      },
      variant: {
        default: "border-border",
        medical: "border-mepale/20 bg-gradient-to-br from-white to-meblue2/30",
        success: "border-megreen/30 bg-gradient-to-br from-white to-megreen/5",
        warning:
          "border-meyellow/50 bg-gradient-to-br from-white to-meyellow/10",
        error:
          "border-destructive/30 bg-gradient-to-br from-white to-destructive/5",
        navy: "border-menavy/20 bg-gradient-to-br from-white to-menavy/5",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const DialogContent = React.forwardRef(
  (
    {
      className,
      children,
      size,
      variant,
      blur,
      showClose = true,
      loading = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      ...props
    },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay blur={blur} />
      <DialogPrimitive.Content
        ref={ref}
        className={contentVariants({ size, variant, className })}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          </div>
        )}
        {children}
        {showClose && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground p-1">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Enhanced header with better typography and medical theme support
const headerVariants = cva(
  "flex flex-col space-y-1.5 text-center sm:text-left",
  {
    variants: {
      variant: {
        default: "",
        medical: "border-b border-mepale/10 pb-4 mb-2",
        centered: "text-center items-center",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const DialogHeader = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={headerVariants({ variant, className })}
      {...props}
    />
  )
);
DialogHeader.displayName = "DialogHeader";

// Enhanced footer with action button layouts
const footerVariants = cva("flex gap-2 pt-4", {
  variants: {
    layout: {
      default: "flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      centered: "justify-center",
      spread: "justify-between",
      start: "justify-start",
      end: "justify-end",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

const DialogFooter = React.forwardRef(
  ({ className, layout, ...props }, ref) => (
    <div
      ref={ref}
      className={footerVariants({ layout, className })}
      {...props}
    />
  )
);
DialogFooter.displayName = "DialogFooter";

// Enhanced title with medical theme support
const titleVariants = cva("text-lg font-semibold leading-none tracking-tight", {
  variants: {
    variant: {
      default: "",
      medical: "text-menavy font-bold",
      large: "text-xl font-bold",
      small: "text-base font-semibold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const DialogTitle = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={titleVariants({ variant, className })}
      {...props}
    />
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Enhanced description with better styling
const descriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {
    variant: {
      default: "",
      medical: "text-menavy/70",
      muted: "text-muted-foreground/70",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const DialogDescription = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={descriptionVariants({ variant, className })}
      {...props}
    />
  )
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// New DialogActions component for common button patterns
const DialogActions = React.forwardRef(
  ({ className, children, variant = "default", ...props }, ref) => {
    const actionVariants = cva("flex gap-2 pt-4", {
      variants: {
        variant: {
          default: "justify-end",
          medical: "justify-end border-t border-mepale/10 pt-4 mt-4",
          confirmation: "justify-between",
          centered: "justify-center",
        },
      },
    });

    return (
      <div
        ref={ref}
        className={actionVariants({ variant, className })}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogActions.displayName = "DialogActions";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogActions,
};
