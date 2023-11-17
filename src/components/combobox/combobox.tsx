// @ts-nocheck
import { Combobox } from "@headlessui/react";
import { useState } from "react";

function ComboBoxComponent({ data,selected, change }) {
  const people = data
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
        return person.toString().toLowerCase().includes(query.toLowerCase())
      })
  return (
    <><section className=" ">
      <Combobox value={selected} onChange={change}>
        <Combobox.Input
     autoComplete="off"
          className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-black caret-black"
          placeholder="Type name to select..."
          onChange={(event) => setQuery(event.target.value.toString())} />
        <Combobox.Options className="block w-full mt-2 p-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-black caret-black">
          {filteredPeople.map((person) => (
            <Combobox.Option className="block cursor-pointer p-4 m-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none hover:bg-gray-100 focus:border-black caret-black" key={person} value={person}>
              {person}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </section></>
  )
}

export default ComboBoxComponent;

