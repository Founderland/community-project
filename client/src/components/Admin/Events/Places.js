import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import { useState } from "react"

import "@reach/combobox/styles.css"

const Places = ({ setAddress, setCity, setLocation, address, setMarker }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete()
  const [selected, setSelected] = useState(false)
  const handleInput = (e) => {
    setSelected(false)
    setValue(e.target.value)
  }

  const handleSelect = (val) => {
    setSelected(true)
    const [completeData] = data.filter((item) => item.description === val)
    setValue(val, false)
    if (
      /route|stree_address|premise|neighborhood|intersection/.test(
        completeData?.types.join("|")
      )
    ) {
      setAddress(completeData.structured_formatting.main_text)
      setCity(completeData.structured_formatting.secondary_text)
    } else if (/locality/.test(completeData?.types.join("|"))) {
      setAddress("")
      setCity(completeData.terms[0].value)
    } else if (/point_of_interest/.test(completeData?.types.join("|"))) {
      setLocation(completeData.terms[0].value)
      const address =
        completeData.structured_formatting.secondary_text.split(", ")
      setAddress(address[0])
      setCity(address[1])
    } else {
      const address =
        completeData.structured_formatting.secondary_text.split(", ")
      console.log(address)
      setAddress(address[0])
      setCity(address[1])
    }
    clearSuggestions()
    getGeocode({ address: val })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setMarker(lat, lng)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
  }
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        className="appearance-none pl-12 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 pr-4 mb-3"
        value={selected ? address : value}
        onChange={handleInput}
        disabled={!ready}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default Places
