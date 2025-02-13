import NavigationBar from "@/components/NavigationBar";
import AddCustomCharacterButton from "@/components/AddCustomCharacterButton";
import FeaturedCharacterCarousel from "./components/FeaturedCharacterCarousel";
import MostPopularCharacterCard from "./components/MostPopularCharacterCard";
import RecentlyAddedCharacterCard from "./components/RecentlyAddedCharacterCard";
import useCharacterStore from "@/store/useCharacterStore";

export default function MainPage() {
  const { characters } = useCharacterStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <span className="text-xl font-bold text-indigo-600">tsunagi.ai</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex-1 relative">
        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6 pt-6">
          <section className="px-4 pb-6">
            <h2 className="text-lg font-semibold mb-3">Featured Characters</h2>
            <FeaturedCharacterCarousel
              characters={Object.entries(characters).slice(0, 4)}
            />
          </section>

          <section className="px-4">
            <h2 className="text-lg font-semibold mb-3">Most Popular</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(characters)
                .slice(0, 4)
                .map(([key, character]) => (
                  <MostPopularCharacterCard key={key} character={character} />
                ))}
            </div>
          </section>

          <section className="px-4 pb-24">
            <h2 className="text-lg font-semibold mb-3">Recently Added</h2>
            <div className="space-y-3">
              {Object.entries(characters)
                .slice(0, 4)
                .map(([key, character]) => (
                  <RecentlyAddedCharacterCard key={key} character={character} />
                ))}
            </div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-32 left-0 right-0 z-10">
        <div className="max-w-2xl mx-auto relative">
          <AddCustomCharacterButton />
        </div>
      </div>

      <NavigationBar />
    </div>
  );
}
