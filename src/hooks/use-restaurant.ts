import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// === MENU & CATEGORIES ===

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/menu/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return await res.json();
    },
  });
}

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await fetch("/api/menu");
      if (!res.ok) throw new Error("Failed to fetch menu");
      return await res.json();
    },
  });
}

// === RESERVATIONS ===

export function useCreateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      date: Date;
      time: string;
      partySize: number;
      message?: string;
    }) => {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create reservation");
      }
      return await res.json();
    },
  });
}

export function useReservation(id: number) {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: async () => {
      const res = await fetch(`/api/reservations/${id}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch reservation");
      return await res.json();
    },
    enabled: !!id,
  });
}

// === CONTACT ===

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to send message");
      }
      return await res.json();
    },
  });
}