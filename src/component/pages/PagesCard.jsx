import BackButton from "../../utils/backButton"

export const PagesCard = ({
  children,
  title = "",
  showBackButton = true
}) => {
  return (
    <>
      <BackButton
        className="top-5 left-0  text-white"
        title={title}
        show={showBackButton}
      />

      <div
        className="
          relative
          w-auto
          mx-1
          md:mx-50
          mt-15
          rounded
          bg-white
          text-black
          p-1
        "
      >
        {children}
      </div>
    </>
  )
}