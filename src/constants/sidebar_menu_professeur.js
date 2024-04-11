import AppsOutageIcon from '../assets/images/3917032-removebg-preview.svg';
import CatchingPokemonIcon from '../assets/images/bolt.svg';
import BiotechIcon from '../assets/images/coins.svg';
import CabinIcon from '../assets/images/flame.svg';
import Diversity3Icon from '../assets/images/folder.svg';
import GroupAddIcon from '../assets/images/globe.svg';
import PsychologyIcon from '../assets/images/graduation-cap.svg';
import PixIcon from '../assets/images/shopping-bag.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: AppsOutageIcon,
        path: '/dashboard/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: BiotechIcon,
        path: '/dashboard/ingenieurs',
        title: 'Eleves ingenieurs',
    },
    {
        id: 3,
        icon: Diversity3Icon,
        path: '/dashboard/prepas',
        title: 'Eleves prepa',
    },
    {
        id: 4,
        icon: GroupAddIcon,
        path: '/dashboard/professeurs',
        title: 'Professeurs',
    },
    {
        id: 5,
        icon: CatchingPokemonIcon,
        path: '/dashboard/modules',
        title: 'Modules',
    },
    {
        id: 6,
        icon: PsychologyIcon,
        path: '/dashboard/elements',
        title: 'Elements',
    },
    {
        id: 7,
        icon: PixIcon,
        path: '/dashboard/filieres',
        title: 'Filieres',
    },
    {
        id: 8,
        icon: PixIcon,
        path: '/dashboard/groupeProjets',
        title: 'Groupes projet',
    },
    {
        id: 9,
        icon: CabinIcon,
        path: '/dashboard/Salles',
        title: 'My account',
    }
]


export default sidebar_menu;