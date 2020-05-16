import {Properties} from 'csstype'

export type EventHandler<E extends Event> = (event: E) => any


export interface StyleProperties extends Properties<string | number>{

}

export type Style = string | string[] | StyleProperties

export type AttributeBoolean = boolean | 'true' | 'false'

export interface HTMLAttribute {
  // accesskey
  accessKey?: string

  // autocapitalize
  autoCapitalize?: string

  class?: string
  contentEditable?: AttributeBoolean | 'inherit';
  contextMenu?: string
  dir?: string
  draggable?: AttributeBoolean
  hidden?: boolean
  id?: string
  lang?: string
  placeholder?: string
  slot?: string
  spellCheck?: AttributeBoolean
  style?: Style
  tabIndex?: number
  title?: string
  translate?: 'yes' | 'no'
}

export interface HTMLEvent {
  onClick?: EventHandler<MouseEvent>
}

export interface DivAttribute extends HTMLAttribute {

}

export interface AlignAttribute {
  /**
   * Not supported in HTML 5
   * Specifies the alignment according to surrounding elements. Use CSS instead
   * @deprecated
   */
  align?: any
}

export interface AutoCompleteAttribute {

}

export interface AcceptAttribute {
  /**
   * Specifies the types of files that the server accepts
   */
  accept?: any
}

export interface AltAttribute {
  alt?: any
}

export interface AreaAttribute extends
  AltAttribute,
  HTMLAttribute {
}

export interface IframeAttribute {
  allow: any
}

export interface ScriptAttribute {
  async?: any
}

export interface FormAttribute extends
  AcceptAttribute,
  AutoCompleteAttribute,
  HTMLAttribute {
  /**
   * Specifies the character encodings that are to be used for the form submission
   * @html accept-charset
   */
  acceptCharset?: any

  /**
   * Specifies where to send the form-data when a form is submitted
   */
  action?: any
}

export interface TextareaAttribute extends
  AutoCompleteAttribute,
  HTMLAttribute {

}

export interface InputAttribute extends
  AcceptAttribute,
  AutoCompleteAttribute,
  HTMLAttribute {

}

export interface SpanAttribute extends
  HTMLAttribute {
}

export interface ButtonAttribute extends
  HTMLAttribute {

}

export type DomNode = boolean | null | undefined | string | number | any

// VE = VirtualElement
// T = Type
export type CreateElementLike<VE, T = string>
  = (type: T, options, ...children: DomNode[]) => VE
