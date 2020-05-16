export type EventHandler<E extends Event> = (event: E) => any

export type Style = string | string[] | CSSStyleDeclaration

export type AttributeBoolean = boolean | 'true' | 'false'

export interface HTMLAttributes {
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

export interface EventHandlers {
  onCancel?: EventHandler<Event>
  onCanPlay?: EventHandler<Event>
}

export interface MouseEventHandlers {
  onClick?: EventHandler<MouseEvent>
  onDBLClick?: EventHandler<MouseEvent>
  onAuxClick?: EventHandler<MouseEvent>
  onContextMenu?: EventHandler<MouseEvent>
}

export interface FocusEventHandlers {
  onBlur?: EventHandler<FocusEvent>
}

export interface ClipboardEventHandlers {
  onCopy?: EventHandler<ClipboardEvent>
  onCut?: EventHandler<ClipboardEvent>
  onPaste?: EventHandler<ClipboardEvent>
}

export interface UIEventHandlers {
  onAbort?: EventHandler<UIEvent>
}

export interface AnimationEventHandlers {
  onAnimationCancel?: EventHandler<AnimationEvent>
  onAnimationEnd?: EventHandler<AnimationEvent>
  onAnimationIteration?: EventHandler<AnimationEvent>
  onAnimationStart?: EventHandler<AnimationEvent>
}

export interface DivAttributes extends HTMLAttributes {

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

export interface AreaAttributes extends
  AltAttribute,
  HTMLAttributes {
}

export interface IframeAttribute {
  allow?: any
}

export interface ScriptAttribute {
  async?: any
}

export interface FormAttributes extends
  AcceptAttribute,
  AutoCompleteAttribute,
  HTMLAttributes {
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

export interface AutofocusAttribute {
  autofocus?: any
}

export interface TextareaAttributes extends
  AutofocusAttribute,
  HTMLAttributes {
}

export interface InputAttributes extends
  AutofocusAttribute,
  AcceptAttribute,
  AutoCompleteAttribute,
  AltAttribute,
  HTMLAttributes {
}

export interface ImgAttributes extends
  AltAttribute,
  HTMLAttributes {
}

export interface SelectAttributes extends
  AutofocusAttribute,
  HTMLAttributes {
}

export interface SpanAttributes extends
  MouseEventHandlers,
  HTMLAttributes {
}

export interface ButtonAttributes extends
  AutofocusAttribute,
  HTMLAttributes {
}

export type DomNode = boolean | null | undefined | string | number | any

// VE = VirtualElement
// T = Type
export type CreateElementLike<VE, T = string>
  = (type: T, options, ...children: DomNode[]) => VE
