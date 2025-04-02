async function handler({ songTitle, songArtist, songUrl }) {
  const session = getSession();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  if (!songTitle || !songArtist || !songUrl) {
    return { error: "Missing required fields" };
  }

  try {
    const result = await sql`
      UPDATE user_profiles 
      SET 
        favorite_song_title = ${songTitle},
        favorite_song_artist = ${songArtist},
        favorite_song_url = ${songUrl},
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${session.user.id}
      RETURNING *`;

    if (result.length === 0) {
      return { error: "Profile not found" };
    }

    return {
      success: true,
      profile: result[0],
    };
  } catch (error) {
    return { error: "Failed to update favorite song" };
  }
}