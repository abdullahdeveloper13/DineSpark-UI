import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertReservation, type InsertMessage } from "@shared/routes";

// === MENU & CATEGORIES ===

export function useCategories() {
  return useQuery({
    queryKey: [api.menu.categories.path],
    queryFn: async () => {
      const res = await fetch(api.menu.categories.path);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.menu.categories.responses[200].parse(await res.json());
    },
  });
}

export function useMenu() {
  return useQuery({
    queryKey: [api.menu.list.path],
    queryFn: async () => {
      const res = await fetch(api.menu.list.path);
      if (!res.ok) throw new Error("Failed to fetch menu");
      return api.menu.list.responses[200].parse(await res.json());
    },
  });
}

// === RESERVATIONS ===

export function useCreateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertReservation) => {
      const validated = api.reservations.create.input.parse(data);
      const res = await fetch(api.reservations.create.path, {
        method: api.reservations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.reservations.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create reservation");
      }
      return api.reservations.create.responses[201].parse(await res.json());
    },
    // No query invalidation needed as we don't list reservations on frontend public view
  });
}

export function useReservation(id: number) {
  return useQuery({
    queryKey: [api.reservations.get.path, id],
    queryFn: async () => {
      const url = api.reservations.get.path.replace(":id", String(id));
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch reservation");
      return api.reservations.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// === CONTACT ===

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.send.input.parse(data);
      const res = await fetch(api.contact.send.path, {
        method: api.contact.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.send.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.send.responses[201].parse(await res.json());
    },
  });
}
