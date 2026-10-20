import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Role } from "./roles";

export async function requireStaffRole(allowedRoles: Role[]) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: staff, error } = await supabase
    .from("staff_profiles")
    .select("full_name, role, is_active")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(`Unable to verify staff access: ${error.message}`);
  if (!staff?.is_active || !allowedRoles.includes(staff.role as Role)) redirect("/login?error=forbidden");
  return { user, staff: { name: staff.full_name, role: staff.role as Role } };
}
