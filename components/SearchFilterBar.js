/**
 * A combined search and filter bar used on the memories gallery. Allows users to
 * search by keyword, filter by mood and location, and sort by date.
 *
 * @param {Object} props
 * @param {string} props.searchTerm
 * @param {Function} props.setSearchTerm
 * @param {string} props.mood
 * @param {Function} props.setMood
 * @param {string} props.location
 * @param {Function} props.setLocation
 * @param {string} props.sort
 * @param {Function} props.setSort
 * @param {string[]} props.moodOptions
 * @param {string[]} props.locationOptions
 */
export default function SearchFilterBar({
  searchTerm,
  setSearchTerm,
  mood,
  setMood,
  location,
  setLocation,
  sort,
  setSort,
  moodOptions,
  locationOptions,
}) {
  return (
    <div className="bg-white rounded-lg shadow-soft p-4 flex flex-col md:flex-row md:items-end gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="search">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search memories"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mood">
          Mood
        </label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="">All moods</option>
          {moodOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">
          Location
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="">All locations</option>
          {locationOptions.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="sort">
          Sort
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}