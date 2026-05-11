export default async function Userprofile({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <h1 className="text-4xl font-bold font-serif text-white">
                Profile
            </h1>

            <p className="text-2xl text-white">
                id : {id}
            </p>

        </div>
    )
}