import { useRandom } from '@/hooks/media/useRandom';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '../ui/dialog'

const Profile = () => {
    const { getRandomSentence } = useRandom();
    const about = getRandomSentence("about");

    return (
        <Dialog>
            <DialogTrigger>
                <img src="/profile.webp" alt="Z3-R0" className="h-10 w-10 rounded-full" loading='lazy' />
            </DialogTrigger>
            <DialogContent className='bg-neutral-900 border border-neutral-800 text-neutral-50 w-full md:w-fit p-4 rounded-md shadow-lg'>
                <img src="/profile.webp" alt="Z3-R0" className="h-auto w-full max-w-64 mx-auto rounded-full" loading='lazy' />
                <DialogFooter className='flex !flex-col gap-2'>
                    <h2 className="text-2xl font-bold">Z3-R0</h2>
                    <p className="text-md text-neutral-200">
                        {about}
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Profile