import { ReactTinyLink, useScrapper } from "react-tiny-link"

const LinkPreview = ({ url }) => {
  const [result, loading, error] = useScrapper({
    url: url,
  })
  return (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      url={url}
      proxyUrl={"https://fl-link-preview.herokuapp.com"}
    />
  )
}

export default LinkPreview
