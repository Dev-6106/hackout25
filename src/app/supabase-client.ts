import {createClient} from '@supabase/supabase-js'

export const supabase = createClient(
    "https://uibqxvcoxrpxilrjhmon.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpYnF4dmNveHJweGlscmpobW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTY4NjksImV4cCI6MjA3MTkzMjg2OX0.rh-9dOZN4TDI5ThIC4gVumJoo2yybLxvSDdF5xTcVnw"
);

export default supabase