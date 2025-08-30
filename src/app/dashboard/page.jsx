"use client";
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Medal, Award, TrendingUp, TrendingDown, Minus,
  Crown, Star, Users, MapPin, TreePine, Camera,
  ChevronUp, ChevronDown, Search, Filter, Calendar, Target
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LeaderboardDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userRank, setUserRank] = useState(null);
  
  // Function to get title based on verified reports
  const getUserTitle = (verifiedReports) => {
    if (verifiedReports >= 100) return { title: 'Verified Protector', color: 'text-purple-600' };
    if (verifiedReports >= 50) return { title: 'Mangrove Protector', color: 'text-green-600' };
    if (verifiedReports >= 10) return { title: 'Early Adopter', color: 'text-blue-600' };
    return { title: 'New Guardian', color: 'text-gray-600' };
  };
  
  // Current logged-in user data
  const currentUser = {
    id: 'current',
    name: 'You',
    realName: 'Maria Santos',
    avatar: '/api/placeholder/150/150',
    points: 1842,
    rank: 14,
    previousRank: 18,
    reports: 67,
    verifiedReports: 62,
    badges: ['early-adopter', 'mangrove-protector', 'verified-guardian'],
    location: 'Mumbai',
    joinedDate: 'Jan 2024',
    streak: 15
  };

  // Top 10 users data
  const [topUsers, setTopUsers] = useState([
    {
      id: 1,
      name: 'Ravi Kumar',
      avatar: '/api/placeholder/150/150',
      points: 3450,
      rank: 1,
      previousRank: 1,
      reports: 142,
      verifiedReports: 138,
      badges: ['champion', 'expert-guardian', '100-reports'],
      location: 'Sundarbans',
      trend: 'same'
    },
    {
      id: 2,
      name: 'Priya Patel',
      avatar: '/api/placeholder/150/150',
      points: 3120,
      rank: 2,
      previousRank: 3,
      reports: 128,
      verifiedReports: 125,
      badges: ['rising-star', 'mangrove-hero'],
      location: 'Gujarat',
      trend: 'up'
    },
    {
      id: 3,
      name: 'Ahmed Khan',
      avatar: '/api/placeholder/150/150',
      points: 2890,
      rank: 3,
      previousRank: 2,
      reports: 115,
      verifiedReports: 110,
      badges: ['consistent-guardian', 'pollution-fighter'],
      location: 'Kerala',
      trend: 'down'
    },
    {
      id: 4,
      name: 'Lakshmi Reddy',
      avatar: '/api/placeholder/150/150',
      points: 2675,
      rank: 4,
      previousRank: 5,
      reports: 98,
      verifiedReports: 95,
      badges: ['weekend-warrior', 'photo-expert'],
      location: 'Andhra Pradesh',
      trend: 'up'
    },
    {
      id: 5,
      name: 'John Sebastian',
      avatar: '/api/placeholder/150/150',
      points: 2540,
      rank: 5,
      previousRank: 4,
      reports: 92,
      verifiedReports: 88,
      badges: ['quick-responder'],
      location: 'Tamil Nadu',
      trend: 'down'
    },
    {
      id: 6,
      name: 'Fatima Sheikh',
      avatar: '/api/placeholder/150/150',
      points: 2380,
      rank: 6,
      previousRank: 7,
      reports: 87,
      verifiedReports: 84,
      badges: ['community-leader'],
      location: 'Maharashtra',
      trend: 'up'
    },
    {
      id: 7,
      name: 'Arjun Nair',
      avatar: '/api/placeholder/150/150',
      points: 2210,
      rank: 7,
      previousRank: 6,
      reports: 82,
      verifiedReports: 78,
      badges: ['satellite-spotter'],
      location: 'Karnataka',
      trend: 'down'
    },
    {
      id: 8,
      name: 'Sita Devi',
      avatar: '/api/placeholder/150/150',
      points: 2150,
      rank: 8,
      previousRank: 9,
      reports: 78,
      verifiedReports: 75,
      badges: ['nature-guardian'],
      location: 'Odisha',
      trend: 'up'
    },
    {
      id: 9,
      name: 'Rajesh Sharma',
      avatar: '/api/placeholder/150/150',
      points: 2090,
      rank: 9,
      previousRank: 8,
      reports: 75,
      verifiedReports: 71,
      badges: ['consistent-reporter'],
      location: 'West Bengal',
      trend: 'down'
    },
    {
      id: 10,
      name: 'Meera Krishnan',
      avatar: '/api/placeholder/150/150',
      points: 1980,
      rank: 10,
      previousRank: 11,
      reports: 71,
      verifiedReports: 68,
      badges: ['rising-guardian'],
      location: 'Goa',
      trend: 'up'
    }
  ]);

  // Filter users based on search query
  const filteredUsers = topUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate rank change
  const getRankChange = (current, previous) => {
    if (current === previous) return { icon: Minus, color: 'text-gray-400', change: 0 };
    if (current < previous) return { icon: ChevronUp, color: 'text-green-600', change: previous - current };
    return { icon: ChevronDown, color: 'text-red-600', change: current - previous };
  };

  // Get badge icon
  const getBadgeIcon = (badge) => {
    const badges = {
      'champion': '🏆',
      'expert-guardian': '🛡️',
      '100-reports': '💯',
      'rising-star': '⭐',
      'mangrove-hero': '🌳',
      'consistent-guardian': '📍',
      'pollution-fighter': '🚫',
      'weekend-warrior': '📅',
      'photo-expert': '📸',
      'early-adopter': '🎯',
      'mangrove-protector': '🌿',
      'verified-guardian': '✅'
    };
    return badges[badge] || '🏅';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Guardian Leaderboard</h1>
            <p className="text-green-100">Recognizing our top mangrove protectors</p>
          </div>

          {/* Current User Rank Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.realName}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white/50"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {currentUser.rank}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentUser.realName}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-4 h-4 text-green-200" />
                    <span className="text-green-100">{currentUser.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-sm font-medium ${getUserTitle(currentUser.verifiedReports).color} bg-white/20 px-2 py-1 rounded`}>
                      {getUserTitle(currentUser.verifiedReports).title}
                    </span>
                  </div>
                                   <div className="flex items-center space-x-2 mt-2">
                    {currentUser.rank < currentUser.previousRank ? (
                      <>
                        <TrendingUp className="w-5 h-5 text-green-300" />
                        <span className="text-green-200">
                          Climbed {currentUser.previousRank - currentUser.rank} positions!
                        </span>
                      </>
                    ) : currentUser.rank > currentUser.previousRank ? (
                      <>
                        <TrendingDown className="w-5 h-5 text-red-300" />
                        <span className="text-red-200">
                          Dropped {currentUser.rank - currentUser.previousRank} positions
                        </span>
                      </>
                    ) : (
                      <>
                        <Minus className="w-5 h-5 text-gray-300" />
                        <span className="text-gray-200">Maintained position</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">#{currentUser.rank}</p>
                  <p className="text-sm text-green-100">Current Rank</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{currentUser.points}</p>
                  <p className="text-sm text-green-100">Points</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{currentUser.reports}</p>
                  <p className="text-sm text-green-100">Reports</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{currentUser.streak}</p>
                  <p className="text-sm text-green-100">Day Streak</p>
                </div>
              </div>
            </div>

            {/* User Badges */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-green-100 mb-2">Your Badges</p>
              <div className="flex flex-wrap gap-2">
                {currentUser.badges.map((badge, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="mr-1">{getBadgeIcon(badge)}</span>
                    {badge.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search guardians..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Top 10 Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
              Top 10 Guardians
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guardian
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const rankChange = getRankChange(user.rank, user.previousRank);
                  const RankIcon = rankChange.icon;
                  const userTitle = getUserTitle(user.verifiedReports);

                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.rank === 1 && <Crown className="w-6 h-6 text-yellow-500 mr-2" />}
                          {user.rank === 2 && <Medal className="w-6 h-6 text-gray-400 mr-2" />}
                          {user.rank === 3 && <Medal className="w-6 h-6 text-orange-600 mr-2" />}
                          <span className={`text-2xl font-bold ${
                            user.rank <= 3 ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {user.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={48}
                            height={48}
                            className="rounded-full mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {user.badges.slice(0, 3).map((badge, index) => (
                                <span key={index} className="text-sm" title={badge}>
                                  {getBadgeIcon(badge)}
                                </span>
                              ))}
                              {user.badges.length > 3 && (
                                <span className="text-xs text-gray-500">+{user.badges.length - 3}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {user.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <p className="text-lg font-semibold text-gray-900">{user.points.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.reports}</p>
                          <p className="text-xs text-gray-500">{user.verifiedReports} verified</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userTitle.color} ${
                          userTitle.title === 'Verified Protector' ? 'bg-purple-100' :
                          userTitle.title === 'Mangrove Protector' ? 'bg-green-100' :
                          userTitle.title === 'Early Adopter' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {userTitle.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <RankIcon className={`w-5 h-5 ${rankChange.color}`} />
                          {rankChange.change > 0 && (
                            <span className={`ml-1 text-sm font-medium ${rankChange.color}`}>
                              {rankChange.change}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Show message if no users found */}
          {searchQuery && filteredUsers.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No guardians found matching "{searchQuery}"</p>
            </div>
          )}

          {/* Show current user position if not in top 10 */}
          {currentUser.rank > 10 && (
            <div className="bg-green-50 border-t-2 border-green-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-green-700">#{currentUser.rank}</span>
                  <div className="flex items-center">
                    <Image
                      src={currentUser.avatar}
                      alt={currentUser.realName}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{currentUser.realName} (You)</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {currentUser.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{currentUser.points.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{currentUser.reports}</p>
                    <p className="text-xs text-gray-500">Reports</p>
                  </div>
                  <div className="text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getUserTitle(currentUser.verifiedReports).color} ${
                      getUserTitle(currentUser.verifiedReports).title === 'Verified Protector' ? 'bg-purple-100' :
                      getUserTitle(currentUser.verifiedReports).title === 'Mangrove Protector' ? 'bg-green-100' :
                      getUserTitle(currentUser.verifiedReports).title === 'Early Adopter' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      {getUserTitle(currentUser.verifiedReports).title}
                    </span>
                  </div>
                  <div className="text-center">
                    {currentUser.rank < currentUser.previousRank ? (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    ) : currentUser.rank > currentUser.previousRank ? (
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    ) : (
                      <Minus className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Stats and Info */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Ranking Criteria */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">How Ranking Works</h3>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Verified Report</span>
                <span className="font-medium text-green-600">+50 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Unverified Report</span>
                <span className="font-medium text-blue-600">+25 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Daily Streak</span>
                <span className="font-medium text-purple-600">+10 pts/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Badge Earned</span>
                <span className="font-medium text-orange-600">+100 pts</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Title Requirements</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Verified Protector</span>
                  <span className="font-medium text-purple-600">100+ verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Mangrove Protector</span>
                  <span className="font-medium text-green-600">50+ verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Early Adopter</span>
                  <span className="font-medium text-blue-600">10+ verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Your Next Milestone</h3>
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-gray-600">To Rank #{currentUser.rank - 1}</span>
                  <span className="text-sm font-medium">158 pts needed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: '76%' }}
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Next Title:</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🛡️</span>
                  <span className="font-medium text-gray-900">Verified Protector</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Reach 100 verified reports (38 more needed)</p>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Next Badge:</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🌊</span>
                  <span className="font-medium text-gray-900">Coastal Champion</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Submit 100 total reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-3">Keep Climbing the Ranks!</h3>
          <p className="text-green-100 max-w-2xl mx-auto mb-6">
            Every report you submit helps protect our mangroves. You're just {158} points away from reaching rank #{currentUser.rank - 1}!
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/submit-report" className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Submit Report
            </Link>
            <Link href="/achievements" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition">
              View All Badges
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}