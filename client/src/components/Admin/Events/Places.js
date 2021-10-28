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

import "@reach/combobox/styles.css"

const Places = ({ setLocation }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false)
      clearSuggestions()

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng })
        })
        .catch((error) => {
          console.log("😱 Error: ", error)
        })
    }

  const renderSuggestions = () => {
    console.log(data)
    const suggestions = data.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ))
    return suggestions
  }

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
        value={value}
        onChange={handleInput}
        disabled={!ready}
      />
      <ComboboxPopover>
        <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default Places
