import 'server-only';

import { jwtVerify, SignJWT } from 'jose';

/**
 * secretKey clé de chiffrement et déchiffrement des token
 *
 * @type {*}
 */

const secretKey = process.env.SESSION_SECRET;

/**
 * encodedKey clé chiffré de chiffrement et déchiffrement des token
 *
 * @type {*}
 */
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * encrypt fonction de création du JWT
 *
 * @export
 * @param {*} payload donnée à chiffrer
 * @returns {SignJWT} token chiffré
 */

export function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

/**
 * decrypt fonction de déchiffrement du token JWT
 *
 * @export
 * @async
 * @param {*} token token à déchiffrer
 * @returns {unknown} En cas de réussite, données déchiffrées
 */

export async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error) {
    return {
      success: false,
      error: `Failed to verify session : ${error.message}`,
    };
  }
}
