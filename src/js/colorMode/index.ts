export declare type BasicColorSchema = "light" | "dark" | "auto"
export interface UseColorModeOptions<T extends string = BasicColorSchema>
    extends UseStorageOptions<T | BasicColorSchema> {
    /**
     * CSS Selector for the target element applying to
     *
     * @default 'html'
     */
    selector?: string
    /**
     * HTML attribute applying the target element
     *
     * @default 'class'
     */
    attribute?: string
    /**
     * The initial color mode
     *
     * @default 'auto'
     */
    initialValue?: T | BasicColorSchema
    /**
     * Prefix when adding value to the attribute
     */
    modes?: Partial<Record<T | BasicColorSchema, string>>
    /**
     * A custom handler for handle the updates.
     * When specified, the default behavior will be overridden.
     *
     * @default undefined
     */
    onChanged?: (
        mode: T | BasicColorSchema,
        defaultHandler: (mode: T | BasicColorSchema) => void
    ) => void
    /**
     * Custom storage ref
     *
     * When provided, `useStorage` will be skipped
     */
    storageRef?: Ref<T | BasicColorSchema>
    /**
     * Key to persist the data into localStorage/sessionStorage.
     *
     * Pass `null` to disable persistence
     *
     * @default 'vueuse-color-scheme'
     */
    storageKey?: string | null
    /**
     * Storage object, can be localStorage or sessionStorage
     *
     * @default localStorage
     */
    storage?: StorageLike
    /**
     * Emit `auto` mode from state
     *
     * When set to `true`, preferred mode won't be translated into `light` or `dark`.
     * This is useful when the fact that `auto` mode was selected needs to be known.
     *
     * @default undefined
     */
    emitAuto?: boolean
}
/**
 * Reactive color mode with auto data persistence.
 *
 * @see https://vueuse.org/useColorMode
 * @param options
 */
export declare function useColorMode<T extends string = BasicColorSchema>(
    options?: UseColorModeOptions<T>
): WritableComputedRef<BasicColorSchema | T>
