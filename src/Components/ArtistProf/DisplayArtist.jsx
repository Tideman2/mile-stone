//gh
export default function DisplayArtist({name, image}) {

    return (
        <>
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
  <p className="font-semibold text-lg mb-2 font-sans text-center">Artist name: {name}</p>
  <div>
    <img
      src={image}
      alt={name}
      className="w-24 h-24 rounded-full border-2 border-gray-300"
    />
  </div>
</div>

        </>
    )
}