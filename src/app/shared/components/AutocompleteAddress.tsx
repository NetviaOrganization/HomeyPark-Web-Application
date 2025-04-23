import { useEffect, useState, useRef } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { InputText } from 'primereact/inputtext'

interface AutocompleteAddressProps {
  onChangedPlace?: (place: google.maps.places.PlaceResult) => void
}

const AutocompleteAddress = ({ onChangedPlace }: AutocompleteAddressProps) => {
  const placesLib = useMapsLibrary('places')
  const [inputValue, setInputValue] = useState('')
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!placesLib || !inputRef.current) return

    const autocomplete = new placesLib.Autocomplete(inputRef.current, {
      fields: ['address_components', 'geometry', 'name', 'formatted_address'],
      types: ['address'],
    })

    autocompleteRef.current = autocomplete

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.name) {
        setInputValue(place.formatted_address ?? '')
        onChangedPlace?.(place)
      }
    })

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placesLib])

  return (
    <InputText
      ref={inputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search for an address"
      className="w-full"
    />
  )
}

export default AutocompleteAddress
