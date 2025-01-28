export default function AuthError({
    searchParams,
  }: {
    searchParams: { error: string }
  }) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Erreur d'authentification</h1>
          <p className="text-gray-600">{searchParams.error}</p>
        </div>
      </div>
    )
  }