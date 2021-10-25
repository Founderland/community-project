import ReactGoogleSlides from "react-google-slides";

const SlideShow = () => {
  return (
    <ReactGoogleSlides
      width={"100%" }
      height={"80%"}
      slidesLink="https://docs.google.com/presentation/d/1QL_LgdtTZJXUKhWJp-CZ2QUdKZvm5Zix2QCUnDtH3LY/edit?usp=sharing"
      // slideDuration={15}
      position={1}
      showControls
      loop
    />
  );
}
export  default SlideShow