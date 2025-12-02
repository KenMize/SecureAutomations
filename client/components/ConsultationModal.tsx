import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tierId: string;
  tierName: string;
  onSubmit: (formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  }) => Promise<void>;
  isSubmitting: boolean;
}

export function ConsultationModal({
  open,
  onOpenChange,
  tierId,
  tierName,
  onSubmit,
  isSubmitting,
}: ConsultationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!company.trim()) {
      newErrors.company = "Company is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      message:
        message.trim() || `Interested in: ${tierName}`,
    };

    try {
      await onSubmit(formData);
      // Reset form on success
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      // Error is handled by parent component
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Your Consultation</DialogTitle>
          <DialogDescription>
            Tell us about your project. We'll be in touch within 2 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Work Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-200">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
            {errors.phone && (
              <p className="text-sm text-red-400">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-200">
              Company Name *
            </Label>
            <Input
              id="company"
              placeholder="Your Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={isSubmitting}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
            {errors.company && (
              <p className="text-sm text-red-400">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-200">
              Additional Details
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us more about your project or any specific questions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
              rows={3}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-cyan-300 text-slate-950 hover:bg-cyan-200 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Consultation Request"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
