export const getQuery = query => {
    const p = { skip: 0, limit: 10 }
    const { limit, skip, search } = query

    const q = {}
    limit && (p.limit = +limit)
    skip && (p.skip = +skip)

    if(search) {
        q.$or = [
            {
                slug: {
                    $regex: query.search,
                    $options: 'im'
                }
            }
        ]
    }

    return { query: q, pagination: p }
}
