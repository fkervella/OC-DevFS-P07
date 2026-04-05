import * as z from 'zod';

/**
 * RegisterFormSchema données de validation du formulaire d'enregistrement
 *
 * @type {*}
 */
export const RegisterFormSchema = z.object({
  email: z.email({ error: 'Entrez un email valide' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Le mot de passe doit faire au minimum 8 caractères' })
    .regex(/[a-zA-Z]/, { error: 'Contenir au moins 1 lettre' })
    .regex(/[0-9]/, { error: 'Contenur au moins un nombre' })
    .regex(/[^a-zA-Z0-9]/, { error: 'Contenir au moins un caractère spécial' })
    .trim(),
});
