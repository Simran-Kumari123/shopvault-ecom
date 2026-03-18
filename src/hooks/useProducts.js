import { useState, useEffect, useCallback } from 'react'

const API_BASE = 'https://dummyjson.com/products'
const PAGE_SIZE = 12

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  // Fetch categories
  useEffect(() => {
    fetch(`${API_BASE}/category-list`)
      .then(r => r.json())
      .then(data => setCategories(data))
      .catch(() => {})
  }, [])

  const fetchProducts = useCallback(async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const skip = reset ? 0 : (page - 1) * PAGE_SIZE
      let url = ''
      if (search.trim()) {
        url = `${API_BASE}/search?q=${encodeURIComponent(search)}&limit=${PAGE_SIZE}&skip=${skip}`
      } else if (category !== 'all') {
        url = `${API_BASE}/category/${category}?limit=${PAGE_SIZE}&skip=${skip}`
      } else {
        url = `${API_BASE}?limit=${PAGE_SIZE}&skip=${skip}`
      }
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setTotal(data.total)
      setHasMore(skip + PAGE_SIZE < data.total)
      setProducts(prev => reset ? data.products : [...prev, ...data.products])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [search, category, page])

  useEffect(() => {
    setPage(1)
    setProducts([])
    fetchProducts(true)
  }, [search, category])

  const loadMore = () => {
    if (!loading && hasMore) setPage(p => p + 1)
  }

  useEffect(() => {
    if (page > 1) fetchProducts(false)
  }, [page])

  return { products, loading, error, search, setSearch, category, setCategory, categories, hasMore, loadMore, total }
}
