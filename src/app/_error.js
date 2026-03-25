/**
 * Error renvoie le statut de l'erreur
 *
 * @param {string} statusCode code de statut de l'erreur
 * @returns Informations complémentaires sur le statut de l'erreur
 */

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
