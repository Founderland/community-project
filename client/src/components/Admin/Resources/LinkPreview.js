import { ReactTinyLink } from "react-tiny-link"

const LinkPreview = ({ url }) => {
  const proxy = "https://fl-link-preview.herokuapp.com"

  return (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      url={url}
      proxyUrl={proxy}
    />
  )
}

export default LinkPreview
