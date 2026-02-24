import { ref, watch, Ref } from 'vue'

export function useFetch(urlRef: Ref<string> | string) {
	const data = ref<any>(null)
	const error = ref<Error | null>(null)

	async function doFetch(u: string) {
		try {
			error.value = null
			const res = await fetch(u)
			// 尝试解析为 JSON，如果不是 JSON 则填充为文本
			const contentType = res.headers.get('content-type') || ''
			if (contentType.includes('application/json')) {
				data.value = await res.json()
			} else {
				data.value = await res.text()
			}
		} catch (e: any) {
			error.value = e
		}
	}

	if (typeof urlRef === 'string') {
		// 立即执行一次
		if (urlRef) doFetch(urlRef)
	} else {
		watch(
			() => urlRef.value,
			(u) => {
				if (u) doFetch(u)
			},
			{ immediate: true }
		)
	}

	return { data, error }
}
