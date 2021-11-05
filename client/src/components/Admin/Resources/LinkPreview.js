import { ReactTinyLink, useScrapper } from "react-tiny-link"

const LinkPreview = ({ url }) => {
  const [result, loading, error] = useScrapper({
    url: url,
  })
  console.log(result, loading, error)
  return (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      url={url}
    />
  )
}

export default LinkPreview
