import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(1)

  const fetchData = () => {


       
    // console.log("🚀 ~ fetchData ~ error.value:", error.value)
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => {
        error.value = err
                
      })
  }

  watchEffect(() => {

    // error.value 
    console.log(111)

    fetchData()


    // fetchData()
  })

  return { data, error }
}