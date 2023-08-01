import {supabase} from '@/components/init'
import { createClient } from '@supabase/supabase-js'

export default function GenerateLink() {
async function generateSignUpLink() {
const { data, error } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email: 'jacobsmith@gmail.com',
  password: 'secret',
  createUser: false,
})
console.log(data)
}
return (
<>
<div> Generate link page </div>
<button onClick={generateSignUpLink}>Generate Sign Up Link</button>
</>
)
}
