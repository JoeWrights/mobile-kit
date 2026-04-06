import { createContext, useContext } from "react"

import { EditableFormContext } from "./types"

export const editableFormContext = createContext<EditableFormContext>({})

export const EditableFormProvider = editableFormContext.Provider

export const useEditableFormContext = () => useContext(editableFormContext)
