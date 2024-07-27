import Link from "next/link";
import Image from "next/image";

const Nav = () => {

    return (
        <nav class="flex space-x-12 items-top justify-left m-2">
                <Link class="text-xl" href="/">Home</Link>
                <Link class="text-xl" href="/plantrip">Plan Your Trip</Link>
                <Link class="text-xl" href="/postitinerary">Post Itinerary</Link>
                <Link class="text-xl" href="/login">Sign In</Link>
        </nav>
    )
};

export default Nav;
