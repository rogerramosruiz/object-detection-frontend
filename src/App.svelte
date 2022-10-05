<script>
  import {Router, Route, Link} from 'svelte-navigator';
  import ImagePage from './pages/ImagePage.svelte';
  import VideoPage from './pages/VideoPage.svelte';
  import LivePage from './pages/LivePage.svelte';

</script>

<Router>
  <header>
    <div class="w">
      <nav class="bg-blue-400 flex justify-center mb-4">
        <Link class="lnk" to='/'>Image</Link>
        <Link class="lnk" to='/video'>Video</Link>
        <Link class="lnk" to='/live'>Live</Link>
      </nav>  
    </div>
  </header>
  
  <main>
    <Route path='/'><ImagePage /> </Route>
    <Route path='video'><VideoPage /> </Route>
    <Route path='live'> <LivePage /> </Route>
  </main>
</Router>
  
<style>
 
</style>
