import { toRefs, watch } from 'vue'

import type { Ref, UnwrapRef } from 'vue'

interface Props<T> {
  modelValue: T
}

interface ReturnType<T> {
  modelValue: Ref<UnwrapRef<T>>
}

export default function useExtractModelValue<T>(props: Props<T>, onChanged?: (value: T) => void): ReturnType<T> {
  const { modelValue }: any = toRefs(props)

  watch(
    modelValue,
    (value) => {
      onChanged?.(value)
    },
    {
      deep: true,
    }
  )

  return {
    modelValue,
  }
}
